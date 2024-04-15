const { setWorldConstructor } = require('@cucumber/cucumber');
const PetApi = require('../api-services/petApi');
const StoreApi = require('../api-services/storeApi');
const UserApi = require('../api-services/userApi');
const BaseApi = require('../api-services/baseApi');

class CustomWorld {
    constructor() {
        this.petApi = new PetApi();
        this.storeApi = new StoreApi();
        this.userApi = new UserApi();
        this.baseApi = new BaseApi();

        this.response = null;
    
        this.petData = {
            id: 0,
            category: {
                id: 0,
                name: "string"
            },
            name: "string",
            photoUrls: [],
            tags: [{
                id: 0,
                name: "string"
            }],
            status: "string"
        };
        this.petsStatuses = null;
        this.formData = null;

        this.orderDetails = {
            id: 0,
            petId: 0,
            quantity: 0,
            shipDate: "2024-04-08T14:00:48.632Z",
            status: "placed",
            complete: true
        };

        this.userData = {
            id: 0,
            username: "world username",
            firstName: "world firstname",
            lastName: "world lastname",
            email: "world@example.com",
            password: "world password",
            phone: "world phone",
            userStatus: 0
          };
          this.usersCollection = null;
    }
}

setWorldConstructor(CustomWorld);