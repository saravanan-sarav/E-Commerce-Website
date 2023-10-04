let intialUsers = [
  {
    destiny: "user",
    id: 1,
    firstName: "Saravanan",
    lastName: "S",
    email: "rajesh@gmail.com",
    phoneNumber: 6379888041,
    password: "2001",
  },
  {
    destiny: "admin",
    id: 2,
    firstName: "Subramani",
    lastName: "S",
    email: "saravanan.subramani@kumaran.com",
    phoneNumber: 6379888041,
    password: "2001",
  },
];
let productDetails = [
  {
    catogory: "Electronics",
    productID: "102",
    productName: "IQOO 7",
    feature1: "HD+ Display",
    feature2: "4400 mAh",
    feature3: "512 Internal",
    feature4: "4GB RAM",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, nisi! Quam, placeat reiciendis? Inventore doloremque maxime reiciendis eius aliquid aliquam.",
    imageURL:
      "https://m.media-amazon.com/images/I/41yAce7gd4L._SX300_SY300_QL70_FMwebp_.jpg",
    stock: 9,
    amount: 15999,
  },
];
// ---Window event ADD---
window.addEventListener("load", () => {
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(intialUsers));
  }
  if (!localStorage.getItem("productList")) {
    localStorage.setItem("productList", JSON.stringify(productDetails));
  }
  if (location.pathname === "/pages/admin/index.html") {
    adminHomePageLoad();
  }
  if (location.pathname === "/pages/home.html") {
    loadHomePage();
  }
  if (location.pathname === "/pages/admin/add-product.html") {
    let params = new URL(document.location).searchParams;
    let productId = params.get("id");
    if (productId) {
      const products = JSON.parse(localStorage.getItem("productList"));
      console.log(products);
      const product = products.find(
        (product) => parseInt(product.productID) === parseInt(productId)
      );
      console.log(product);
      populateProduct(product);
    } else {
      const productIdSectionref = document.getElementById("productIdSection");
      let productIDTest = IdGenerator("productList");
      if (productIDTest) {
        productIdSectionref.innerHTML = ` <input
          type="text"
          class="form-control m-2 border-primary"
          id="productID"
          value="${productIDTest}"
          disabled
        />`;
      }
    }
  }
});

// ---User ID Generator---
const randomNumberGenrator = (max = 1000) => {
  return Math.floor(Math.random() * max);
};
const IdGenerator = (type) => {
  let JSONarr = JSON.parse(localStorage.getItem(type));
  for (let i = 0; i < 1000; i++) {
    let random = randomNumberGenrator();
    let checking = JSONarr.find((itr) => itr.id === random);
    if (!checking) {
      return random;
    }
  }
};
// ---Id Genration ends----

// Validate Email
const ValidateEmail = (mail) => {
  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (mail.match(mailformat)) {
    return true;
  }
};

// ---Registraion Validations START---
const registrationHandler = () => {
  const signUpButtonref = document.getElementById("signUpButton");
  const toastRef = document.getElementById("toast");
  const toastMessageRef = document.getElementById("toastMessage");
  console.log(signUpButtonref);
  const regUserSeletorref = document.getElementById("regUserSeletor");
  const firstNameref = document.getElementById("fname");
  const lastNameref = document.getElementById("lname");
  const emailref = document.getElementById("email");
  const phoneNumberref = document.getElementById("phoneNumber");
  const passwordref = document.getElementById("password");
  const confirmPasswordref = document.getElementById("conPass");
  const signUpErrorref = document.getElementById("signUpError");
  const termsAndConditionref = document.getElementById("termAndCondition");

  console.log(firstNameref.value.length);
  // Check all field have values
  if (
    firstNameref.value.length > 0 &&
    lastNameref.value.length > 0 &&
    emailref.value.length > 0 &&
    phoneNumberref.value.length > 0 &&
    passwordref.value.length > 0 &&
    confirmPasswordref.value.length > 0
  ) {
    if (regUserSeletorref.value.length > 1) {
      if (ValidateEmail(emailref.value) === true) {
        // Checking password and confirmpassword is equal
        if (passwordref.value === confirmPasswordref.value) {
          if (termsAndConditionref.checked) {
            let users = JSON.parse(localStorage.getItem("users"));
            users.push({
              destiny: regUserSeletorref.value,
              id: IdGenerator("users"),
              firstName: firstNameref.value,
              lastName: lastNameref.value,
              email: emailref.value,
              phoneNumber: phoneNumberref.value,
              password: passwordref.value,
            });
            localStorage.setItem("users", JSON.stringify(users));
            toastMessageRef.innerText = "Product added successfully!!!";
            toastRef.classList.add("fade", "show");
            setTimeout(() => {
              toastRef.classList.remove("fade", "show");
            }, 2000);
            location.href = "./index.html";
          } else {
            signUpErrorref.innerText =
              "Please accept the terms and condition...";
          }
          termsAndConditionref.addEventListener("click", () => {
            signUpErrorref.innerText =
              "Please accept the terms and condition...";
          });
        } else {
          signUpErrorref.innerText = "Password Mismatching...";
        }
        passwordref.addEventListener("focus", () => {
          signUpErrorref.innerText = "";
        });
        confirmPasswordref.addEventListener("focus", () => {
          signUpErrorref.innerText = "";
        });
      } else {
        signUpErrorref.innerText = "Enter the Valid Email";
      }
    } else {
      signUpErrorref.innerText = "Please select user destination";
      regUserSeletorref.addEventListener("focus", () => {
        signUpErrorref.innerText = "";
      });
    }
  } else {
    signUpErrorref.innerText = "Plese fill all fields..!!!";
    firstNameref.addEventListener("focus", () => {
      signUpErrorref.innerText = "";
    });
    lastNameref.addEventListener("focus", () => {
      signUpErrorref.innerText = "";
    });
    phoneNumberref.addEventListener("focus", () => {
      signUpErrorref.innerText = "";
    });
    emailref.addEventListener("focus", () => {
      signUpErrorref.innerText = "";
    });
    passwordref.addEventListener("focus", () => {
      signUpErrorref.innerText = "";
    });
  }
};
// ---Registration Validations END---

// ---Login Validations---

const loginHandler = () => {
  const loginEmailref = document.getElementById("loginEmail");
  const loginPasswordref = document.getElementById("loginPassword");

  const loginErrorref = document.getElementById("loginError");
  // console.log(userSeletorref);

  if (ValidateEmail(loginEmailref.value)) {
    if (loginPasswordref.value.length > 0) {
      let users = JSON.parse(localStorage.getItem("users"));
      let credentials = users.find((credent) => {
        if (
          credent.email === loginEmailref.value &&
          credent.password === loginPasswordref.value
        )
          return credent;
        else {
          loginErrorref.innerText = "credentials Invalid";
        }
      });
      if (credentials) {
        console.log(credentials.destiny);
        if (credentials.destiny === "admin") {
          location.replace("/pages/admin/index.html");
        } else if (credentials.destiny === "user") {
          location.replace("/pages/home.html");
        }
      } else loginErrorref.innerText = "Account Not Found";
    } else {
      loginErrorref.innerText = "enter the valid Email..!!";
      loginEmailref.addEventListener("focus", () => {
        loginErrorref.innerText = "";
      });
    }
  }
};

//  ---Login Validations END---

// Product List START
let loadHomePage = () => {
  let productList = JSON.parse(localStorage.getItem("productList"));
  let productDetails = "";
  let productViewRef = document.getElementById("productview");
  productList = productList.map((arr) => {
    productDetails += `<div id="productCard" class="col-3 card">
    <img
      src="${arr.imageURL}"
      class="card-img-top ProductList"
      alt="Product Image"
    />
    <div class="card-body">
      <h5 class="card-title">${arr.productName}</h5>
      <div class="card-title features">
        <ul class="d-flex">
          <div class="row">
            <li class="col-6 featureDetails text-break">${arr.feature1}</li>
            <li class="col-6 featureDetails">${arr.feature2}</li>
          </div>
          <div class="row">
            <li class="col-6 featureDetails">${arr.feature3}</li>
            <li class="col-6 featureDetails">${arr.feature4}</li>
          </div>
        </ul>
        <div class="d-flex">
                  <p class="fs-5 text-danger pt-2 me-2 mb-0">₹</p>
                  <p class="fs-3 text-danger mb-0">${arr.amount}</p>
                </div>
      </div>
      <a href="#" id="addToCart" class="btn btn-success">Add to cart</a>
    </div>
  </div>`;
  });
  productViewRef.innerHTML = productDetails;
};

if (location.pathname === "/pages/home.html") {
  loadHomePage();
}
// Add Product Start
const addProductPage = () => {
  const productIDref = document.getElementById("productID");
  let productList = JSON.parse(localStorage.getItem("productList"));
  console.log(productList);
  let filtered = productList.find(
    (product) => parseInt(product.productID) === parseInt(productIDref.value)
  );
  if (filtered) {
    if (true) {
      const CatogorySelectorref = document.getElementById("CatogorySelector");
      const productIDref = document.getElementById("productID");
      const productNameref = document.getElementById("productName");
      const feature1ref = document.getElementById("feature1");
      const feature2ref = document.getElementById("feature2");
      const feature3ref = document.getElementById("feature3");
      const feature4ref = document.getElementById("feature4");
      const descriptionref = document.getElementById("description");
      const productImageLinkref = document.getElementById("productImageLink");
      const stockref = document.getElementById("stock");
      const priceref = document.getElementById("price");
      const toastRef = document.getElementById("toast");
      const toastMessageRef = document.getElementById("toastMessage");
      const addProductErrorref = document.getElementById("addProductError");
      let productList = JSON.parse(localStorage.getItem("productList"));

      if (CatogorySelectorref.value.length > 1) {
        console.log(CatogorySelectorref.value.length);
        if (productIDref.value.length > 0) {
          if (productNameref.value.length > 0) {
            if (
              feature1ref.value.length > 0 &&
              feature3ref.value.length > 0 &&
              feature2ref.value.length > 0 &&
              feature4ref.value.length > 0
            ) {
              if (descriptionref.value.length > 0) {
                if (productImageLinkref.value.length > 0) {
                  if (stockref.value.length > 0) {
                    if (priceref.value.length > 0) {
                      productList.push({
                        catogory: CatogorySelectorref.value,
                        productID: productIDref.value,
                        productName: productNameref.value,
                        feature1: feature1ref.value,
                        feature2: feature2ref.value,
                        feature3: feature3ref.value,
                        feature4: feature4ref.value,
                        description: descriptionref.value,
                        imageURL: productImageLinkref.value,
                        stock: stockref.value,
                        amount: priceref.value,
                      });
                      localStorage.setItem(
                        "productList",
                        JSON.stringify(productList)
                      );
                      location.replace("./index.html");
                      toastMessageRef.innerText =
                        "Product added successfully!!!";
                      toastRef.classList.add("fade", "show");
                      setTimeout(() => {
                        toastRef.classList.remove("fade", "show");
                      }, 2000);
                    } else
                      addProductErrorref.innerText =
                        "Please enter the Amount of the product";
                  } else
                    addProductErrorref.innerText =
                      "Please enter the stock details";
                } else
                  addProductErrorref.innerText =
                    "Please enter the Product image URL";
              } else
                addProductErrorref.innerText = "Please enter the Description";
            } else
              addProductErrorref.innerText =
                "Please enter the Top Features of the product";
          } else addProductErrorref.innerText = "Please enter the Product name";
        }
      } else addProductErrorref.innerText = "Please enter the Catogory";
      productNameref.addEventListener("focus", () => {
        addProductErrorref.innerText = "";
      });
      feature1ref.addEventListener("focus", () => {
        addProductErrorref.innerText = "";
      });
      feature2ref.addEventListener("focus", () => {
        addProductErrorref.innerText = "";
      });
      feature3ref.addEventListener("focus", () => {
        addProductErrorref.innerText = "";
      });
      feature4ref.addEventListener("focus", () => {
        addProductErrorref.innerText = "";
      });
      descriptionref.addEventListener("focus", () => {
        addProductErrorref.innerText = "";
      });
      priceref.addEventListener("focus", () => {
        addProductErrorref.innerText = "";
      });
      stockref.addEventListener("focus", () => {
        addProductErrorref.innerText = "";
      });
      productImageLinkref.addEventListener("focus", () => {
        addProductErrorref.innerText = "";
      });
    }
  }
};
// ADMIN HOME PAGE START
const adminHomePageLoad = () => {
  let productListSectionref = document.getElementById("productListSection");
  let productList = JSON.parse(localStorage.getItem("productList"));
  let adminPageLoader = "";
  productList = productList.map((arr) => {
    adminPageLoader += `<div
    class="d-flex rounded mb-3"
    style="box-shadow: rgba(0, 0, 0, 0.5) 5px 3px 15px; height: 40%"
  >
    <div class="d-flex m-4">
      <p class="fs-4 me-4" style="margin-top: 50%">1</p>
      <div class="bg-primary" style="width: 2px"></div>
      <img
      id="adminProductList"
        src="${arr.imageURL}"
        class="adminProductList"
        alt="product img"
      />
    </div>
    <div
      class="col-6 m-3 bg-primary-subtle rounded p-4"
      style="height: 90%"
    >
    <p class="fs-4 mb-0">${arr.productName}</p>
      <div class="bg-danger-subtle rounded p-2 mt-2">
      <p class="fs-5 mt-1 mb-2">
       Description:
      </p>
      <p class="fs-6 mb-0" style="text-indent: 50px">
       ${arr.description}
      </p></div>
    </div>
    <div
      class="col-3 bg-body-secondary rounded p-3 m-3"
      style="box-shadow: rgba(0, 0, 0, 0.5) 5px 3px 15px"
    >
      <p class="fs-5">Stock : ${arr.stock}</p>
      <div class="bg-primary" style="width: 100%; height: 2px"></div>
      <p class="fs-6 mt-3 mb-0">Price:</p>
      <p class="fs-3 mb-0 text-danger">₹ ${arr.amount}.00</p>

      <div class="d-flex mt-2">
        <button class="btn btn-outline-primary" style="margin-left:40%" onclick="editProductHandler(${arr.productID})"
          >Edit</button
        ><button
          class="btn btn-outline-danger"
          style="margin-left:5%"
          onclick="DeleteProductHandler(${arr.productID})"
          >delete</button
        >
      </div>
    </div>
    <p></p>
  </div>`;
  });
  productListSectionref.innerHTML = adminPageLoader;
};
// Admin Delete Product
const DeleteProductHandler = (id) => {
  const products = JSON.parse(localStorage.getItem("productList"));
  const filtered = products.filter(
    (prod) => parseInt(prod.productID) !== parseInt(id)
  );
  localStorage.setItem("productList", JSON.stringify(filtered));
  adminHomePageLoad();
};
// Admin Edit Product
const editProductHandler = (id) => {
  location.replace(`./add-product.html?id=${id}`);
};
const populateProduct = (product) => {
  const CatogorySelectorref = document.getElementById("CatogorySelector");
  const productIDref = document.getElementById("productID");
  const productNameref = document.getElementById("productName");
  const feature1ref = document.getElementById("feature1");
  const feature2ref = document.getElementById("feature2");
  const feature3ref = document.getElementById("feature3");
  const feature4ref = document.getElementById("feature4");
  const descriptionref = document.getElementById("description");
  const productImageLinkref = document.getElementById("productImageLink");
  const stockref = document.getElementById("stock");
  const priceref = document.getElementById("price");
  const addProductErrorref = document.getElementById("addProductError");
  const productIdSectionref = document.getElementById("productIdSection");
  let productIDTest = IdGenerator("productList");
  if (productIDTest) {
    productIdSectionref.innerHTML = ` <input
      type="text"
      class="form-control m-2 border-primary"
      id="productID"
      value="${product.productID}"
      disabled
    />`;
  }
  CatogorySelectorref.value = product.catogory;
  productIDref.value = product.productID;
  productNameref.value = product.productName;
  feature1ref.value = product.feature1;
  feature2ref.value = product.feature2;
  feature3ref.value = product.feature3;
  feature4ref.value = product.feature4;
  descriptionref.value = product.description;
  productImageLinkref.value = product.imageURL;
  stockref.value = product.stock;
  priceref.value = product.amount;
};

if (location.pathname === "/pages/admin/index.html") {
  adminHomePageLoad();
}
