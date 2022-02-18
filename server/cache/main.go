package cache

import (
	"context"
	"strconv"
	"time"

	"github.com/go-redis/redis/v8"
)

var ctx context.Context = context.Background()
var Redis *redis.Client = CreateRedis()

// Connect To Redis Instance
func CreateRedis() *redis.Client {
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password set
		DB:       0,
	})
	return rdb
}

func SetString(key string, value string, ttl time.Time) error {
	err := Redis.Set(ctx, key, value, 0).Err()

	return err

}
func SetInt(key string, value int) error {
	err := Redis.Set(ctx, key, value, 0).Err()

	return err

}

func GetString(key string) (string, error) {
	return Redis.Get(ctx, key).Result()
}

func GetInt(key string) (int, error) {
	var err error
	val, get_err := Redis.Get(ctx, key).Result()
	if get_err != nil {
		err = get_err
	}
	num, conv_err := strconv.Atoi(val)
	if conv_err != nil {
		err = conv_err
	}
	return num, err
}
