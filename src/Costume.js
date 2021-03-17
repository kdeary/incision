class Costume {
	constructor(resource) {
		this.resource = resource;
		this.texture = this.resource.texture;
		this.name = this.resource.name;
		this.path = this.resource.url;
	}
}

module.exports = Costume;