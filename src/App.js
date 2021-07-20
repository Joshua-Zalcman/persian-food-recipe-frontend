import { useState, useEffect } from 'react';
// import 'materialize-css/dist/css/materialize.min.css';
import './App.css';
import Index from './components/Index';
import Show from './components/Show';
import { Switch, Route } from 'react-router-dom';

function App() {
	const [foodsState, setFoodsState] = useState({ foods: [] });
	const URL = 'https://persian-food-backend.herokuapp.com/foods';

	useEffect(() => {
		async function getFoods() {
			try {
				const foods = await fetch(URL).then((response) => response.json());
				setFoodsState({ foods });
			} catch (error) {
				console.log(error);
			}
		}
		getFoods();
	}, []);

	async function handleAdd(formInputs) {
		try {
			const foods = await fetch(URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'Application/json',
				},
				body: JSON.stringify(formInputs),
			}).then((res) => res.json());
			console.log(foods);
			setFoodsState({ foods });
		} catch (error) {
			console.log(error);
		}
	}

	async function handleUpdate(formInputs, id) {
		try {
			const { title, ingredients, img, directions, url } = formInputs;
			const foods = await fetch(`${URL}/${id}`, {
				method: 'PUT',
				headers: { 'Content-type': 'Application/json' },
				body: JSON.stringify({ title, ingredients, img, directions, url }),
			}).then((response) => response.json());
			setFoodsState({ foods });
		} catch (err) {
			console.log(err);
		}
	}

	async function handleDelete(foodId) {
		try {
			const foods = await fetch(`${URL}/${foodId}`, {
				method: 'DELETE',
			}).then((res) => res.json());
			setFoodsState({ foods });
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className="App">
			<Switch>
				<Route exact path="/">
					<Index
						URL={URL}
						foods={foodsState.foods}
						handleDelete={handleDelete}
						handleAdd={handleAdd}
					/>
				</Route>
				<Route
					path="/:id"
					render={(rp) => (
						<Show
							foods={foodsState.foods}
							{...rp}
							handleUpdate={handleUpdate}
						/>
					)}
				/>
			</Switch>
		</div>
	);
}

export default App;
