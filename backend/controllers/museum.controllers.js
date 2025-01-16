exports.sendArtworks = async (req, res, next) => {
    try{
        const artworks = await getArtworks()
        res.status(200).send({artworks})
    } catch (error) {
        next(error)
    }
    
}