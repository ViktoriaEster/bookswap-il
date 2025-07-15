import {Router, type Response, type Request} from "express";
import {City} from "../types/City";
import {mockCities as cities} from "../data/mockCities";
import {findCityAndIndexById, generateCountCityId, validateCityName} from "../utils/citiesUtils";

const citiesRouter = Router();

//Get methods
//Get all cities
citiesRouter.get("/", (req: Request, res: Response<City[]>) => {
    res.status(200).json(cities);
});

//Get city by id
citiesRouter.get("/:id", (req: Request<{ id: string }>, res: Response<City | { error: string }>) => {
    const cityId = req.params.id;
    const {city, index} = findCityAndIndexById(cityId);
    if (index === -1) return res.status(404).json({error: "No City Found"});
    res.status(200).json(city);
});

//Add new city
citiesRouter.post("/", (req: Request<{},{},{name: string}>, res: Response<City | {error: string}>) => {
    const newCityName = req.body.name;
    const validateCityNameError = validateCityName(newCityName);
    if (validateCityNameError) {return res.status(400).json({error: validateCityNameError});}
    const newCityId = generateCountCityId();
    const newCity = {name: newCityName, id: newCityId};
    cities.push(newCity)
    res.status(201).json(newCity);
});

//Edit city name by id
citiesRouter.put("/:id", (req: Request<{id:string}, {}, {name: string}>, res: Response<City| {error: string}>) => {
    const cityId = req.params.id;
    const updateCityName = req.body.name;
    const {index} = findCityAndIndexById(cityId);
    if (index === -1) return res.status(404).json({error: "No City Found"});
    const validateCityNameError = validateCityName(updateCityName);
    if (validateCityNameError) {return res.status(400).json({error: validateCityNameError});}
    const updateCity: City = {id: cityId, name: updateCityName};
    cities[index] = updateCity;
    res.status(200).json(updateCity);
});

//Delete city by id
citiesRouter.delete("/:id", (req: Request<{id: string}>, res: Response<{message: string} | {error:string}>)=>{
    const cityId = req.params.id;
    const {index} = findCityAndIndexById(cityId);
    if (index === -1) return res.status(404).json({error: "No City Found"});
    cities.splice(index, 1);
    res.status(200).json({message:`City ${cityId} deleted`});
});

export default citiesRouter;