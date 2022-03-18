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
