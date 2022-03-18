package utils

import "os"

const UserFileDirectory = ""

func WriteFile(name string) error {
	return os.WriteFile("filename.txt", []byte("Hello"), 0755)
}

func CreateUserDirectory(folderName string) error {
	return os.Mkdir(UserFileDirectory+folderName, 0755)
}

func RemoveFile() {

}
