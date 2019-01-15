CREATE TABLE annotations (
	id INT AUTO_INCREMENT PRIMARY KEY,
	page VARCHAR(30),
	uid VARCHAR(15),
	aid VARCHAR(20),
	tag VARCHAR(30),
	startOffset INT,
	endOffset INT,
	start VARCHAR(200),
	end VARCHAR(200),
	quote TEXT
);

INSERT INTO annotations (
	page,
	uid,
	aid,
	tag,
	startOffset,
	endOffset,
	quote
)
VALUES (
	"se212",
	"userID",
	"annID"
	"Clear",
	818,
	959,
	"ly construct a working device at that time. The first practically implemented device was a point-contact transistor invented in 1947 by Ameri"
);