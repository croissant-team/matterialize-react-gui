# Locations
BUILD_DIR := build 
BIN_DIR := out

# Tools
RM := rm -rf

# The make rules
all: build

# Builds the project, along with all of the dependencies
build:
	npm install
	npm run make

install-deb: build
	sudo dpkg -i out/make/deb/x64/matterialize_0.1.0_amd64.deb

install-linux-generic: build
	mkdir -p ~/.matterialize
	unzip out/make/zip/linux/x64/Matterialize-linux-x64-0.1.0.zip -d ~/.matterialize
	mv ~/.matterialize/Matterialize-linux-x64 ~/.matterialize/frontend
	sudo ln -s ~/.matterialize/frontend/Matterialize /usr/local/bin/matterialize

clean:
	$(RM) $(BUILD_DIR) $(BIN_DIR)

uninstall-deb:
	sudo apt remove matterialize -y

uninstall-linux-generic:
	rm -rf ~/.matterialize/frontend
	sudo rm -f /usr/local/bin/matterialize


.PHONY: all clean install uninstall
