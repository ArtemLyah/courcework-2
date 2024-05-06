class URLS {
  private API = (process.env.REACT_APP_API_URL ?? '')+'/api';

  fishers = {
    create: this.API + '/fishers',
    getOne: (fisherId: number) => this.API + `/fishers/${fisherId}`,
    getAll: this.API + '/fishers',
    update: (fisherId: number) => this.API + `/fishers/${fisherId}`,
    delete: (fisherId: number) => this.API + `/fishers/${fisherId}`,
  }

  organisations = {
    create: this.API + '/organisations',
    getOne: (organisationId: number) => this.API + `/organisations/${organisationId}`,
    getAll: this.API + '/organisations',
    update: (organisationId: number) => this.API + `/organisations/${organisationId}`,
    delete: (organisationId: number) => this.API + `/organisations/${organisationId}`,
  }

  places = {
    create: this.API + '/places',
    getOne: (placeId: number) => this.API + `/places/${placeId}`,
    getAll: this.API + '/places',
    update: (placeId: number) => this.API + `/places/${placeId}`,
    delete: (placeId: number) => this.API + `/places/${placeId}`,
  }

  orders = {
    create: this.API + '/orders',
    getOne: (orderId: number) => this.API + `/orders/${orderId}`,
    getAll: this.API + '/orders',
    update: (orderId: number) => this.API + `/orders/${orderId}`,
    delete: (orderId: number) => this.API + `/orders/${orderId}`,
  }
}

const urls = new URLS();

export default urls;