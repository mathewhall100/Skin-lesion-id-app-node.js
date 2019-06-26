import zerorpc

from model_fastai import FastaiImageClassifier

PORT = 4242

class PythonServer(object):
    def listen(self):
        print(f'Python Server started listening on {PORT} ...')

    def predict_from_img(self, img_path):
        print(f'predict on image {img_path}...')
        model = FastaiImageClassifier()
        print(f'model {model}')
        pred_cat = model.predict(img_path)
        print(f'pred {pred_cat}')
        pred = {'predict': str(pred_cat['predict'])}
        return pred

try:
    s = zerorpc.Server(PythonServer())
    s.bind(f'tcp://0.0.0.0:{PORT}')
    s.run()
    print('PythonServer running...')
except Exception as e:
    print('unable to start PythonServer:', e)
    raise e
