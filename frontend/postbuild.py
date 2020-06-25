import shutil
from distutils import dir_util
import os


files = os.listdir("build/")

dest_dir = os.path.join(os.path.abspath(os.path.dirname(__file__)), "../email_site/build")
dir_util.copy_tree("build/", dest_dir)