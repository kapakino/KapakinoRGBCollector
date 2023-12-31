#!/bin/bash

# Check if Node.js is installed
if command -v node > /dev/null ; then
    echo "Node.js is already installed."
else
    read -p "Node.js is not installed. Do you want to install it? (y/n): " install
    if [ "$install" == "y" ]; then
        echo "Installing Node.js..."
        sudo apt-get update
        sudo apt-get install -y nodejs
        echo "Node.js installation complete."
    else
        echo "Node.js installation canceled."
    fi
fi

echo "Now installing dependency of project"
npm install
echo "Now create the folder for linux"
mkdir linux
echo "Creating program to folder"
npm run build-linux

echo "Now the program should be in linux folder"
read -r