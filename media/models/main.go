package models

type AuthRequest struct {
	Token string `json:"token"`
}
type AuthResponse struct {
	Authorized bool   `json:"is_authorized"`
	Id         string `json:"id"`
	Username   string `json:"username"`
	Time       string `json:"time"`
}

type EditFileNameRequest struct {
	UserId      string `json:"user_id"`
	FileId      string `json:"file_id"`
	NewFileName string `json:"new_file_name"`
}

type File struct {
	Author   string `json:"author"`
	FileName string `json:"file_name"`
	FileId   string `json:"id"`
	FileType string `json:"file_type"`
	FileSize int64  `json:"file_size"`
}

type UserFiles struct {
	Files []File `json:"files"`
}
type FileEditResponse struct {
	FileId    string `json:"file_id"`
	Succeeded bool   `json:"succeeded"`
	Error     string `json:"error"`
}

type FileDeletionRequest struct {
	UserId string `json:"user_id"`
	FileId string `json:"file_id"`
}
