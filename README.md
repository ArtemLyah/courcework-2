# Cource work from Databases
### Faculty of Informatics and Computational Technology

Made by student of Kyiv Politechnic Institute

IS-21 Liakh Artemii

Theme of the course work: `Fishing places`

## Run with kubernetes:

Create docker images
```
docker build -f dockerfiles/backend.Dockerfile -t backend .
docker build \
    -f dockerfiles/frontend.Dockerfile \
    --build-arg REACT_APP_API_URL=http://localhost \
    -t frontend .
```

### If you use `kind` kubernetes:
---
Initialize kind cluster
```
kind create cluster --config=kubernetes/kind-cluster.yaml --name=course-work
kind load docker-image backend -n course-work
kind load docker-image frontend -n course-work
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml
```
---

Run kubernetes files
```
kubectl apply -f kubernetes/database-sts.yaml
kubectl apply -f kubernetes/backend-depl.yaml
kubectl apply -f kubernetes/frontend-depl.yaml
kubectl apply -f kubernetes/ingress.yaml
```

## Run with skaffold:

```
skaffold build --file-output skaffold-build.json
skaffold deploy -a skaffold-build.json
```

## Run with docker compose:

```
docker compose up
```