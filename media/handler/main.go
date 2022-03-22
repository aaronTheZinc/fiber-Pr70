package handler

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"

	"github.com/gofrs/uuid"
	"github.com/vreel/media/test"
)

func UploadFile(w http.ResponseWriter, r *http.Request) {
	var err error
	// Maximum upload of 10 MB files
	r.ParseMultipartForm(10 << 20)

	// Get handler for filename, size and headers
	file, handler, err := r.FormFile("myFile")
	if err != nil {
		fmt.Println("Error Retrieving the File")
		fmt.Println(err)
		return
	}

	defer file.Close()

	// Create file
	dst, _ := os.Create(handler.Filename)

	defer func() { dst.Close() }()

	// Copy the uploaded file to the created file on the filesystem
	if _, err := io.Copy(dst, file); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	dst.Close()
	file.Close()

	// retrieve the file extension
	fe := filepath.Ext("/" + dst.Name())
	id, _ := uuid.NewV4()

	//rename file to specified
	s := os.Rename(dst.Name(), id.String()+fe)

	if s != nil {
		fmt.Println(s.Error())
	}
	fmt.Fprintf(w, "Successfully Uploaded File\n")
}

func UploadFileHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println(r.Method)
	if r.Method == "POST" {

		fmt.Println("Running P{o")
		UploadFile(w, r)
	} else if r.Method == "GET" {
		fmt.Println("running get func...")
		test.Display(w, "upload", nil)
	} else {
		fmt.Fprintf(w, "Method Not Allowed")
	}

}

func RenderFile() {

}
