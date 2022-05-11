package server

import (
	"context"

	"github.com/tus/tusd/pkg/handler"
)

func GetFileInfo(id string) (handler.FileInfo, error) {
	var ctx context.Context
	var info handler.FileInfo
	f, err := store.GetUpload(ctx, id)

	if err == nil {
		if i, fileInfoErr := f.GetInfo(ctx); fileInfoErr != nil {
			err = fileInfoErr
		} else {
			info = i
		}

	}

	return info, err
}

func RemoveFile(id string) {

}
