const { Router } = require('express');
const { Op, Character, Role } = require('../db');
const router = Router();

router.post('/', async (req, res) => {
    const { code, name, age, race, hp, mana, date_added } = req.body

    if (!code || !name || !hp || !mana) return res.status(404).send('Falta enviar datos obligatorios')

    try {
        const newCharacter = await Character.create({
            code, name, age, race, hp, mana, date_added
        })

        return res.status(201).json(newCharacter)
    } catch (error) {
        return res.status(404).send('Error en alguno de los datos provistos')
    }
})

router.get('/young', async (req, res) => {
    const youngCharacters = await Character.findAll({
        where: {
            age: { [Op.lt]: 25 }
        }
    })

    return res.status(200).json(youngCharacters)
})

router.get('/', async (req, res) => {
    const { race, age } = req.query

    try {
        let allCharacters
        if (race && age) allCharacters = await Character.findAll({
            where: {
                [Op.and]: { race, age }
            }
        })
        if (race && !age) allCharacters = await Character.findAll({ where: { race } })
        if (!race && age) allCharacters = await Character.findAll({ where: { age } })
        if (!race && !age) allCharacters = await Character.findAll()

        return res.status(200).json(allCharacters)
    } catch (error) {
        return res.status(404).send('Error en alguno de los datos provistos')
    }
})

router.get('/:code', async (req, res) => {
    const { code } = req.params

    const character = await Character.findByPk(code)

    if (!character) return res.status(404).send(`El código ${code} no corresponde a un personaje existente`)

    return res.status(200).json(character)
})

router.put('/:attribute', async (req, res) => {
    const { attribute } = req.params
    const { value } = req.query

    await Character.update({ [attribute]: value }, {
        where: {
            [attribute]: null
        }
    })

    return res.status(200).send('Personajes actualizados')
})

router.put('/addAbilities', async (req, res) => {
    const { codeCharacter, abilities } = req.body

    res.status(200).send('Habilidades creadas')
})

router.get('/roles/:code', async (req, res) => {
    const { code } = req.params

    const character = await Character.findByPk(code)

    res.status(200).json(character)
})

module.exports = router;