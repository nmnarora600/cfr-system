import numpy as np
import argparse
import cv2 as cv2
import matplotlib.pyplot as plt
import time
import os
import random
import string
import torch
from torch.autograd import Variable

from utils import gpu_manage, heatmap
from models.gen.SPANet import Generator
def generate_random_key(length):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))




def show(img):
    # cv2.imshow('image', img)
    cv2.waitKey(0)
    # Generate a random key
    random_key = generate_random_key(6)  # You can adjust the length of the random key as needed
    print("generated key=", random_key)

# Save the image with a unique filename
    save_dir = '../results'
    os.makedirs(save_dir, exist_ok=True)  # Create the directory if it doesn't exist
    save_filename = f'result_image_{random_key}.jpg'
    save_path=os.path.join(save_dir,save_filename)
    cv2.imwrite(save_path,img )
    cv2.destroyAllWindows()

def predict(args):

    gpu_manage(args)
    ### MODELS LOAD ###
    print('===> Loading models')

    gen = Generator(gpu_ids=args.gpu_ids)

    param = torch.load(args.pretrained)
    gen.load_state_dict(param)

    if args.cuda:
        gen = gen.cuda(0)

    print ('<=== Model loaded')

    print('===> Loading test image')
    img = cv2.imread(args.test_filepath, 1).astype(np.float32)
    img = img / 255
    img = img.transpose(2, 0, 1)
    img = img[None]
    print ('<=== test image loaded')

    with torch.no_grad():
        x = torch.from_numpy(img)
        if args.cuda:
            x = x.cuda()
        
        print('===> Removing the cloud...')
        start_time = time.time()
        att, out = gen(x)
        print('<=== finish! %.3fs cost.' % (time.time()-start_time))

        x_ = x.cpu().numpy()[0]
        x_rgb = x_ * 255
        x_rgb = x_rgb.transpose(1, 2, 0).astype('uint8')
        out_ = out.cpu().numpy()[0]
        out_rgb = np.clip(out_[:3], 0, 1) * 255
        out_rgb = out_rgb.transpose(1, 2, 0).astype('uint8')
        att_ = att.cpu().numpy()[0] * 255
        att_heatmap = heatmap(att_.astype('uint8'))[0]
        att_heatmap = att_heatmap.transpose(1, 2, 0)

        allim = np.hstack((x_rgb, out_rgb, att_heatmap))
        show(allim)

        plt.figure()
        plt.subplot(1,3,1), plt.title('cloudy image'), plt.imshow(x_rgb), plt.axis('off')
        plt.subplot(1,3,2), plt.title('cloudless image'), plt.imshow(out_rgb), plt.axis('off')
        plt.subplot(1,3,3), plt.title('attention map'), plt.imshow(att_heatmap), plt.axis('off')

        plt.show()
        fig.savefig('graph.png')
        

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--test_filepath', type=str, required=True)
    parser.add_argument('--pretrained', type=str, required=True)
    parser.add_argument('--cuda', action='store_true')
    parser.add_argument('--gpu_ids', type=int, default=[0])
    parser.add_argument('--manualSeed', type=int, default=0)
    args = parser.parse_args()

    predict(args)