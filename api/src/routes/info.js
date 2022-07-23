const axios = require('axios');
require('dotenv').config();
const { Dog, Temperament } = require('../db');

const { API_KEY } = process.env;

const getApi = async () => {
    const api = (await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)).data
    const api_info = await api.map(dogs => {
        return {
            id: dogs.id,
            name: dogs.name,
            height: dogs.height.metric,
            weight: dogs.weight.metric,
            life_span: dogs.life_span,
            image: dogs.image.url,
            temperaments: dogs.temperament?dogs.temperament:'La raza no tiene temperamento asociado'
           
        }
    });
    return api_info;
};

const getdb = async () => {
    const datainfo = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
                
            },
        }
    })
    // const data_db= datainfo.map(info=>{
    //     return {
    //         name: info.name,
    //         image: info.image,
    //         temperament: info.temperaments,
    //         weight: info.weight,
    //         height: info.height,
    //         life_span: info.life_span
    //     }
    // })
    
    return datainfo;
}

const getData = async () => {
    const dataApi = await getApi();
    const dataDb = await getdb();
    const data = dataApi.concat(dataDb);
    return data;
}

module.exports = { getData, getApi, getdb };