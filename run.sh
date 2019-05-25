if [ "$#" -ne 2 ]; then
  echo "Usage : ./run.sh lambdaName";
  exit 1;
fi

env=${1%/}; 
region=${2%/}; 
array_contains () {
    local seeking=$1; shift
    local in=1
    for element; do
        if [[ $element == $seeking ]]; then
            in=0
            break
        fi
    done
    return $in
}

envAarry=("dev" "stage" "prod");
regionArray=("us-east-1" "us-east-2")
if [[  " ${envAarry[@]} " =~ " $env " ]] && [[  " ${regionArray[@]} " =~ " $region " ]]; then
    echo "Deploying lambda on $env env and region $region"
    echo "********************************************************";
    echo "**If this is not correct please cancel before 20 Second**";
    echo "********************************************************";
    sleep 20
    else
    echo "please check the arguments";
    echo "env = $env. Available environment are 'Dev' 'stage' or 'prod'";
    echo "region = $region. Available regions are 'us-east-1' 'us-east-2'";
    exit 1;
fi


#echo "nmp installing...";
#npm install
#if [ $? -eq 0 ]; then
#  echo "done";
#else 
#  echo "npm install failed";
#  exit 1;
#fi

echo "Checking that aws-cli is installed"
which aws
if [ $? -eq 0 ]; then
  echo "aws-cli is installed, continuing..."
else
  echo "You need aws-cli to deploy this lambda. Google 'aws-cli install'"
  exit 1
fi

#Git Commands
read -p "Please provide git commit message" commitMsg;
git add .;
git commit -m "$commitMsg";
echo "commit done!!!";
read -p "Please provide branch name" branchName;
git push origin "$branchName";
if [ $? -eq 0 ]; then
  echo "!! Changes successfully pushed to branch $branchName !!"
else 
  echo "Got Error"
  exit 1;
fi

# echo "removing old zip"
# rm .serverless/archive.zip;

# echo "creating a new zip file"
# zip archive.zip *  -r -x .git/\* \*.sh tests/\* node_modules/aws-sdk/\* \*.zip

echo "Uploading on environment $env to $region";

#sls deploy --stage $env --region $region

if [ $? -eq 0 ]; then
  echo "!! Upload successful !!"
else 
  echo "Upload failed"
  echo "If the error was a 400, check that there are no slashes in your env name"
  echo "env name = $env"
  exit 1;
fi