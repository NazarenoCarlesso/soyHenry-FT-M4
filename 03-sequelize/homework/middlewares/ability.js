const { Router } = require('express');
const { Ability } = require('../db');
const router = Router();

router.get('/', async (req, res) => {
    const abilities = await Ability.findAll()

    res.status(200).json(abilities)
})

router.post('/', async (req, res) => {
    const { name, mana_cost } = req.body

    if (!name || !mana_cost) return res.status(404).send('Falta enviar datos obligatorios')

    const newAbility = await Ability.create({
        name, mana_cost
    })

    return res.status(201).json(newAbility)
})

router.put('/setCharacter', async (req, res) => {
    const { idAbility, codeCharacter } = req.body

    await Ability.update({ CharacterCode: codeCharacter }, {
        where: {
            id: idAbility
        }
    })

    const ability = await Ability.findByPk(idAbility)

    res.status(200).json(ability)
})

module.exports = router;