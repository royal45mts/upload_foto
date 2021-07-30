module.exports = (app) =>{
    app.get('/jobs', (request, response) => {
        let db = [
            {
                id: 1,
                name: 'Warior',
                attack: 100,
                defence: 50,
                agility: 30,
                magic: 0,
            },
            {
                id: 2,
                name: 'Mage',
                attack: 10,
                defence: 20,
                agility: 50,
                magic: 100,
            },
        ];
        return response.json(db);
    });
}
