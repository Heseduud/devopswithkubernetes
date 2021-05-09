# Devops with Kubernetes

Course exercise submissions for [Devops with Kubernetes](https://devopswithkubernetes.com/).

Exercises done with Node.js / React. 

## Parts

Documentation on how parts are arranged

### Part 1

Exercises submitted in individual folders (with the exception of 1.3 and 1.4, which are in folders 1.1 and 1.2). Individual folders were a bad idea, will be using the same "main-folders" for parts 2 and onward with commits differentiating exercises.

### Part 2

Commits from d142b0dd9a1d8d0459927837b425e5a976e41cc8 to 5ae0e7d72d497c95d84c2cb565779278bb6adb13. See: https://github.com/Heseduud/devopswithkubernetes/commits/main

### Part 3
Commits from 2e65e28d6d3260b91d3c33c39cdc0e7c1d4ead51 to 1306193d806f29266273fc9d06c3441254bf4d8a

#### 3.06
DBaaS is obviously more expensive than DIY databases. DBaaS requires less work though, as initialization, maintaining and backups are done by the cloud provider. These also seem way easier to do with DBaaS. So in general DBaaS = less work, more $ and DIY = more work, less $.

#### 3.07
I'll use the DIY one as I have it set up already.

### Part 4

Commits from 489f1229a28e2ec0e0ffa3ef4685691a3dc1b9b0 to 73771cd29bd4afc01e9c6ad2c37d74cdceef59cd, see below for 4.07&4.08

#### 4.03 query
```
count(kube_pod_info {namespace="prometheus", created_by_kind="StatefulSet"})
```

#### 4.07 & 4.08
Can be found in this repo: https://github.com/Heseduud/kube-cluster-dwk

### Part 5

Commits from 1c43ba45a81c290a4ef036ee6cc2f1015e29702e to 7146c208964129a02df6db68177796c9778026a5
