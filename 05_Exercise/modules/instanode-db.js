/**
 * Created by Toni on 6/2/2017.
 */
let Image = require('../models/image')
let Tag = require('../models/tag')


function createTag(tagName) {

    return new Promise((resolve, reject) => {

        Tag.findOne({name: tagName}).then((existingTag) => {

            if (existingTag) {

                resolve(existingTag._id)
                return

            }

            Tag.create({name: tagName}).then((tag) => {

                resolve(tag._id)
            })
        })
    })

}


function updateTag(tagData) {

    return new Promise((resolve, reject) => {

        Tag.findById(tagData.id).then((existingTag) => {

            existingTag.images.push(tagData.imageId)
            resolve(existingTag.save())
        })
    })

}


module.exports.saveImage = (image) => {

    let imageObject = {

        url: image.url,
        description: image.description,
        tags: []


    }

    let createTagPromise = []

    for (let tagName of image.tags) {

        createTagPromise.push(
            createTag(tagName).then((tagID) => {

                imageObject.tags.push(tagID)

            }))

    }


    Promise.all(createTagPromise).then(() => {

        Image.create(imageObject).then((createdImage) => {

            console.log('Image created!')

            for (let tag of createdImage.tags) {

                updateTag({id: tag, imageId: createdImage._id}).then(() => {

                    console.log('Image added to the tags collections')
                })


            }
        })


    })


}

module.exports.findByTag = (tag) => {


    return new Promise((resolve, reject) => {

        Tag.findOne({name: tag}).then((foundTag) => {

            if (foundTag) {

                Image.find({tags: foundTag._id}).then((foundImages) => {

                    let sortedImages = foundImages.sort((a, b) => b.creation_date > a.creation_date)
                    resolve(sortedImages)

                })
            } else {

                reject('Tag not found!')

            }


        })


    })

}

module.exports.filter = (minDate, maxDate, results) => {

    if (!results) {

        results = 10;
    }

    if (!minDate) {

        minDate = new Date(-864000000000000).toISOString()

    }

    if (!maxDate) {

        maxDate = Date.now().toISOString()

    }

    return new Promise((resolve, reject) => {


        Image.find({

            creation_date: {

                $gte: minDate.toISOString(),
                $lte: maxDate.toISOString()
            }
        }).limit(results).then((images) => {

            if (images) {

                resolve(images)
            }

            reject(images)
        })

    })


}