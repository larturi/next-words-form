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

    minikube addons enable ingress
    minikube ip
    # Add to etc/hots
    # <minikube-ip>   wordforms.larturi.local

    cd ingress/
    kubectl apply -f .

    kubectl apply -f 01-fastapi-deployment.yaml
    kubectl apply -f 02-php-deployment.yaml
    kubectl apply -f 03-next-deployment.yaml
    kubectl apply -f 04-fastapi-service.yaml
    kubectl apply -f 05-php-service.yaml
    kubectl apply -f 06-next-service.yaml
    kubectl apply -f 07-ingress.yaml
```
