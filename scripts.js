let submitButton = document.getElementById("btn");
let postContainer = document.getElementById("container");

submitButton.addEventListener("click", () => {
    let postname = document.getElementById("username");
    let postBody = document.getElementById("message");
    let image1 = document.getElementById("image");


    let name = postname.value;
    let body = postBody.value;
    let img1 = image1.value;


    console.log(typeof (name)); // string, so I can use length to get the character count


    if (name.length < 4) {
        alert("Please add a username with at least 4 characters");
        return;
    }
    if (body.length < 6) {
        alert("Please enter your message");
        return;
    }
    if (img1 === "") {
        alert("Please enter your image URL");
        return;
    }


    fetch("https://68219a12259dad2655afc1e1.mockapi.io/api/post", {
        method: "POST",
        body: JSON.stringify({
            username: name,
            textarea: body,
            img: img1,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    }).then(() => {
        postname.value = "";
        postBody.value = "";
        image1.value = "";
    });
});


PostFun = () => {
    fetch(`https://68219a12259dad2655afc1e1.mockapi.io/api/post`)
        .then((response) => response.json())
        .then((data) => {
            data.forEach((item) => {
                let post = document.createElement("div");
                post.className = "card";
                let postId = document.createElement("p");
                postId.innerText = `ID : ${item.id}`;
                let postName = document.createElement("h4");
                postName.innerText = `username : ${item.name}`;
                let postBody = document.createElement("p");
                postBody.innerText = `Post : ${item.body}`;
                let postImg = document.createElement("img");
                postImg.className = "post-img";
                if (item.img) {
                    postImg.src = item.img;
                } else {
                    postImg.src =
                        "https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2t5fGVufDB8fDB8fHww";
                }

                let deleteButton = document.createElement("button");
                deleteButton.innerText = "Delete";
                deleteButton.className = "delete-button";

                post.appendChild(postImg);
                post.appendChild(postName);
                post.appendChild(postBody);
                post.appendChild(postId);
                post.appendChild(deleteButton);

                deleteButton.addEventListener("click", () => {
                    fetch(
                        `https://68219a12259dad2655afc1e1.mockapi.io/api/post/${item.id}`,
                        {
                            method: "DELETE",
                        }
                    ).then(() => {
                        postContainer.removeChild(post);
                    });
                });

                postContainer.appendChild(post);
            });
        });
};

PostFun();
