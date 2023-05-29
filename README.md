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
