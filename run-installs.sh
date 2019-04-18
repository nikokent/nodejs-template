red=`tput setaf 1`
green=`tput setaf 2`
yellow=`tput setaf 3`
blue=`tput setaf 4`
blue=`tput setaf 5`
reset=`tput sgr0`

#helper functions 
#Downloading node packages for template
download_packages () {
  echo "${yellow}Attempting to install necessary packages ...${reset}"
  npm install express --save
  npm install moment --save
  npm install body-parser --save
  npm install path --save
  npm install cookie-parser --save
  npm install mysql --save
}

#check for fixing repo
if [[ $* == *--fix* ]]; then
    echo "${green}Fixing repo setup!${reset}"
    cd ..
    rm -rf nodejs-template
    git clone https://github.com/nikokent/nodejs-template.git
    exit 1
fi

if [ -f "package.json" ]; then
  echo "${green}Looks like template has been built already!${reset}"
  echo "Running ${yellow}node app.js${reset}"
  node app.js
  exit 1
fi

#check for requirements
if ! [ -x "$(command -v node)" ]; then
  if ! [ -x "$(command -v apt)" ]; then
    if ! [ -x "$(command -v brew)" ]; then  
      echo "${red}Node is not installed. Please visit https://nodejs.org/en/ and install to continue! >&2${reset}"
      exit 1
    else
      echo 'Attempting to install node and npm!'
      brew install node
      echo "${green}Node is installed [✓]${reset}"
    fi
  else  
    echo "${yellow}Attempting to install node and npm${reset}"
    sudo apt install nodejs npm
    echo "${green}Node is installed [✓]${reset}"
  fi
else
  echo "${green}Node is installed [✓]${reset}"
fi
if ! [ -x "$(command -v git)" ]; then
  if ! [ -x "$(command -v brew)" ]; then
    echo "${red}git is not installed. Please visit https://desktop.github.com/ and install to continue!' >&2${reset}"
  else
    echo 'Attempting to install git!'
    brew install git
    echo "${red}Please try to restart script${reset}"
  fi
  if ! [ -x "$(command -v apt)" ]; then
    echo "${red}git is not installed. Please visit https://desktop.github.com/ and install to continue!' >&2${reset}"
  else
    echo 'Attempting to install git!'
    sudo apt install git
    echo "${red}Please try to restart script${reset}"
  fi
  exit 1
else
  echo "${green}Git  is installed [✓]${reset}"
  if [[ $* == *--keep* ]]; then
    echo "${green}Keeping repo setup!${reset}"
  else
    echo "${red}Removing all traces of git within project${reset}"
    rm -rf .git
  fi
fi

if [ -f "package.json" ]; then
  echo "${green}package.json found!${reset}"
  download_packages
else
  echo 'Running npm init -y and creating package.json'
  npm init -y
  download_packages
fi

if [ -f "app.js" ]; then
  echo "${color} (づ｡◕‿‿◕｡)づ AlMosT DoNe! ${reset}"
  echo "${green}Starting your server!${reset}"
  echo "From now on to run the server run: ${yellow}node app.js${reset}"
  echo "Thank you for trying my template! Enjoy! ${blue}-Niko Kent :)${reset}"
  node app.js
else
  echo 'Cloning node js template from git'
  git clone https://github.com/nikokent/nodejs-template.git
  rm -rf .git
fi

if ![ -x "$(command -v apt)" ]; then
  xdg-open localhost:3000/
fi

if [ -x "$(command -v brew)" ]; then  
  open localhost:3000/
fi