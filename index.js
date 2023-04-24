const fs = require("fs");
const superagent = require("superagent");

const readFilePromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("I could not find that file");
      resolve(data);
    });
  });
};

const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("Could not write the file");
      resolve("success");
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePromise(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res1Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const imgs = all.map((m) => m.body.message);
    console.log(imgs);

    await writeFilePromise("dog-img.txt", imgs.join("\n"));
    console.log("Random dog image saved to file");
  } catch (err) {
    console.log(err);
    throw err;
  }
  return "2: READY";
};

(async () => {
  try {
    console.log("1: Will get dog pics");
    const res = await getDogPic();
    console.log(res);
    console.log("3: Done getting dog pics");
  } catch (err) {
    console.log("ERROR");
  }
})();

/* console.log("1: Will get dog pics");
getDogPic()
  .then((x) => {
    console.log(x);
    console.log("3: Done getting dog pics");
  })
  .catch((err) => {
    console.log("ERROR");
  }); */

/*
readFilePromise(`${__dirname}/dog.txt`)
  .then((result) => {
    console.log(`Breed: ${result}`);
    return superagent.get(
      `https://dog.ceo/api/breed/${result}/images/random`
    );
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFilePromise("dog-img.txt", res.body.message);
  })
  .then(() => {
    console.log("Random dog image saved to file");
  })
  .catch((err) => {
    console.log(err);
  });
*/

// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
// Callback
// superagent
//   .get(`https://dog.ceo/api/breed/${data}/images/random`)
//   .end((err, res) => {
//     if (err) return console.log(err.message);
//     console.log(res.body.message);
//     fs.writeFile("dog-img.txt", res.body.message, (err) => {
//       console.log("Random dog image saved to file");
//     });
//   });
// Promises
// })
