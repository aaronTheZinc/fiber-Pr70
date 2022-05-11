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

type File struct {
	Author   string `json:"author"`
	FileName string `json:"file_name"`
	FileId   string `json:"uri"`
	FileType string `json:"file_type"`
}
