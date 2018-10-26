module.exports = {
    "up": `CREATE TABLE users (
        id INT NOT NULL AUTO_INCREMENT,
        name  VARCHAR(256) NOT NULL,
        email  VARCHAR(256) NOT NULL,
        password VARCHAR(256) NOT NULL,
        avatar VARCHAR(256) NULL,
        created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
      )
      `,
    "down": "DROP TABLE users"
}
