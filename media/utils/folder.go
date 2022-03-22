package utils

import "os"

const UserFileDirectory = "./data/"

func WriteFile(name string) error {
	return os.WriteFile("filename.txt", []byte("Hello"), 0755)
}

func CreateUserDirectory(folderName string) error {

	os.Mkdir(UserFileDirectory+folderName, 0755)
	os.Mkdir(UserFileDirectory+folderName+"/videos", 0755)
	os.Mkdir(UserFileDirectory+folderName+"/images", 0755)

	return nil
}

func UserFolderExists(name string) bool {
	_, err := os.Open("./data/" + name)
	return err == nil
}

func RemoveFile() {

}
