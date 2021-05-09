const k8s = require('@kubernetes/client-node');
const mustache = require('mustache');
const request = require('request');
const fs = require('fs').promises;
const JSONStream = require('json-stream');
const sslRootCAs = require('ssl-root-cas');

sslRootCAs.inject()

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const opts = {};
kc.applyToRequest(opts);

const client = kc.makeApiClient(k8s.CoreV1Api);

// From the example controller
const sendRequestToApi = async (api, method = 'get', options = {}) => new Promise((resolve, reject) => request[method](`${kc.getCurrentCluster().server}${api}`, {...opts, ...options, headers: { ...options.headers, ...opts.headers }}, (err, res) =>  {
  console.log(res.body);
  if (err) {
    reject(err)
  } else {
    resolve(JSON.parse(res.body));
  }
}));

const fieldsFromDummySite = (object) => ({
  dummysite_name: object.metadata.name,
  container_name: object.metadata.name,
  pod_name: `${object.metadata.name}-pod-dwk`,
  namespace: object.metadata.namespace,
  url: object.spec.url,
  image: object.spec.image
});

const getPodYAML = async (fields) => {
  const deploymentTemplate = await fs.readFile('pod.mustache', 'utf-8');
  return mustache.render(deploymentTemplate, fields);
}

const createPod = async (fields) => {
  console.log('Creating pod for dymmysite', fields.url, fields.dummysite_name, 'to namespace', fields.namespace);
  const yaml = await getPodYAML(fields);
  console.log(yaml);
  return sendRequestToApi(`/api/v1/namespaces/${fields.namespace}/pods`, 'post', {
    headers: {
      'Content-Type': 'application/yaml'
    },
    body: yaml
  });
};

const maintainStatus = async () => {
  (await client.listPodForAllNamespaces()).body

  const dummysite_stream = new JSONStream();
  dummysite_stream.on('data', async (data) => {
    const fields = fieldsFromDummySite(data.object);

    if (data.type === 'ADDED') {
      createPod(fields);
    }
  });

  console.log(kc.getCurrentCluster().server);
  request.get(`${kc.getCurrentCluster().server}/apis/stable.dwk/v1/dummysites?watch=true`, opts).pipe(dummysite_stream);
}

maintainStatus();