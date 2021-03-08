import backendGetGallery from '../../backend/get-gallery'

export default async function getGallery(req, res) {
  const offsetKey = req.query.offsetKey
  const { contents, isTruncated } = await backendGetGallery({ offsetKey })

  res.status(200).json({
    contents,
    isTruncated
  })
}
