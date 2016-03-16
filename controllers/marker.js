module.exports = function(markerModel) {
	return {
		post: function(req, res, next) {
			var latitude = (req.body.latitude == parseFloat(req.body.latitude)) ? req.body.latitude : null;
			var longitude = (req.body.longitude == parseFloat(req.body.longitude)) ? req.body.longitude : null;
			var description = req.body.description ? req.body.description.trim() : null;
			if(!latitude || !longitude || !description) {
				return res.status(400).json({
					description: description,
					latitude: latitude,
					longitude: longitude
				});
			}
			markerModel.create({
				name: req.body.name ? req.body.name : null,
				description: req.body.description,
				latitude: req.body.latitude,
				longitude: req.body.longitude,
				address: req.body.address ? req.body.address : null,
				phone: req.body.phone ? req.body.phone : null,
				email: req.body.email ? req.body.email : null
			}).then(function(marker) {
				res.json({
					message: 'Success!',
					data: marker
				});
			}).catch(function(err) {
				next(err);
			});
		},
		
		get: function(req, res, next) {
			var offset = (req.params.offset == parseInt(req.params.offset)) ? req.params.offset : 0;
			markerModel.findAll({
				limit: 2000,
				offset: offset,
				order: 'id ASC'
			}).then(function(markers) {
				response = [];
				for (var i = 0; i < markers.length; i++) {
					response.push({
						name: markers[i].name,
						description: markers[i].description,
						latitude: markers[i].latitude,
						longitude: markers[i].longitude
					});
				}
				res.json(response);
			}).catch(function(err) {
				next(err);
			});
		}
	};
}