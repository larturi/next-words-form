# Next Words Forms Practice

## Local

```bash

npm install

npm run dev
```

## Production

```bash
    docker build -t larturi/wordsform-next-app:latest .
    docker push larturi/wordsform-next-app:latest
    docker run -p 3000:3000 --name wordsform-next-app larturi/wordsform-next-app  
```

### Installation with kubectl

```bash
    kubectl create namespace wordsform
    kubectl apply -f . --namespace wordsform
    kubectl get all --namespace wordsform
```

### Installation with Helm

```bash
    kubectl create namespace wordsform

    helm install wordforms wordforms-helm

    helm delete wordforms
```

### Access to application and services

```bash
   # Next.js Application
    http://localhost:32000

    # FastApi Service Words
    http://localhost:31000/random_word_family/love

    # Php Service Translate
    http://localhost:31001/?word=love
```

### To scale the app or uninstall

```bash
    # To scale the app
    kubectl scale deployment next-client-app --replicas=3 --namespace wordsform

    # To delete all objects
    kubectl delete all --all --namespace wordsform
```
