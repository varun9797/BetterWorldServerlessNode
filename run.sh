if [ "$#" -ne 1 ]; then
  echo "Usage : ./build.sh lambdaName";
  exit 1;
fi

env=${1%/}; 
echo "Deploying $env";
#cd $env;
if [ $? -eq 0 ]; then
  echo "...."
else
  echo "Couldn't cd to directory $env. You may have mis-spelled the env/directory name";
  exit 1
fi

echo "nmp installing...";
npm install
if [ $? -eq 0 ]; then
  echo "done";
else 
  echo "npm install failed";
  exit 1;
fi

echo "Checking that aws-cli is installed"
which aws
if [ $? -eq 0 ]; then
  echo "aws-cli is installed, continuing..."
else
  echo "You need aws-cli to deploy this lambda. Google 'aws-cli install'"
  exit 1
fi

# echo "removing old zip"
# rm .serverless/archive.zip;

# echo "creating a new zip file"
# zip archive.zip *  -r -x .git/\* \*.sh tests/\* node_modules/aws-sdk/\* \*.zip

echo "Uploading on environment $env to $region";

sls deploy --stage $env

if [ $? -eq 0 ]; then
  echo "!! Upload successful !!"
else 
  echo "Upload failed"
  echo "If the error was a 400, check that there are no slashes in your env name"
  echo "env name = $env"
  exit 1;
fi