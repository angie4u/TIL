# 도커 명령어 모음
```
docker images
docker build -t motherbot . 
docker ps -a
docker run -it -p 5001:80 motherbot
```
```
RunAs=App;AppId=<AppId>;TenantId=<TenantId>;AppKey=<AppSecret>
docker build -t vameetsaks0711.azurecr.io/va/motherbot .
docker push vameetsaks0711.azurecr.io/va/motherbot
docker run -it -p 5001:443 -e KeyVaultName=<KeyVaultName> -e CertificateName=<CertiName> -e AzureConnectionString="<ConnectionString From line9>" motherbotvameetsaks0711.azurecr.io/va/motherbot 
```

# Yaml 업데이트 후에...
```
helm upgrade va-dev .   
helm upgrade --recreate-pods va-dev .
```

# 그밖에 도움되는...
```
kubectl logs <container name>
kubectl get pods
kubectl get pods --namespace kube-system
helm ls -a
az acr login --name vameetsaks0711
```
