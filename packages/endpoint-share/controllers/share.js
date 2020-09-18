import got from 'got';

export const shareController = publication => ({
  edit: (request, response) => {
    const {content, name, url, success} = request.query;

    response.render('share', {
      title: response.__('share.title'),
      content,
      name,
      url,
      success,
      minimalui: (request.params.path === 'bookmarklet')
    });
  },

  save: async (request, response, next) => {
    const {content, name, url} = request.body;
    const host = `${request.protocol}://${request.headers.host}`;
    const path = publication.micropubEndpoint;

    try {
      const endpointResponse = await got.post(`${host}${path}`, {
        form: request.body,
        responseType: 'json'
      });

      const success = endpointResponse.body;
      if (success) {
        const message = encodeURIComponent(success.success_description);
        response.redirect(`?success=${message}`);
      }
    } catch (error) {
      if (error.response) {
        response.render('share', {
          title: response.__('share.title'),
          content,
          name,
          url,
          error: error.response.body.error_description,
          minimalui: (request.params.path === 'bookmarklet')
        });
      } else {
        next(error);
      }
    }
  }
});
