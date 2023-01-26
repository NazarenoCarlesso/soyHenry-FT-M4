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

router.get('/', async (req, res) => {
    const { race } = req.query

    try {
        const allCharacters = race
            ? await Character.findAll({ where: { race } })
            : await Character.findAll()

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

module.exports = router;