class Category {
	id: string;
	name: string;
	image: string;
	color: string;
	questions: string[];

	constructor(params: { id: string; name: string; image: string; color: string; questions: string[] }) {
		this.id = params.id;
		this.name = params.name;
		this.image = params.image;
		this.color = params.color;
		this.questions = params.questions;
	}

	public static FactoryGetList(data: any): Category[] {
		const catList: Category[] = [];
		data.results.forEach((cat: any) => {
			catList.push(
				new Category({
					id: cat.id,
					name: cat.name,
					image: cat.image,
					color: cat.color,
					questions: cat.questions,
				})
			);
		});
		return catList;
	}

	public static empty(): Category {
		return new Category({
			color: "",
			id: "",
			image: "",
			name: "",
			questions: []
		})
	}
}

export default Category;
