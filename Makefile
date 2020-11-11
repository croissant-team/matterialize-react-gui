# Locations
BUILD_DIR := build 
BIN_DIR := out

# Tools
RM := rm -rf

# The make rules
all:
	build

# Builds the project, along with all of the dependencies, into a single jar
build:
	npm install
	npm run make

install: build
	sudo dpkg -i out/make/deb/x64/matterialize_0.1.0_amd64.deb

uninstall:
	sudo apt remove matterialize

clean:
	$(RM) $(BUILD_DIR) $(BIN_DIR)

.PHONY: all clean install
