docker build --no-cache . -t $1:$2 $3
docker tag $1:$2 $(minikube ip):5000/$1:$2
docker push $(minikube ip):5000/$1:$2
