import React, {Component} from 'react';
import './Profile.css';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCameraRetro} from '@fortawesome/free-solid-svg-icons';



class Profile extends Component{
  constructor(props){
    super(props);
    this.state = {
      currentAction: '',
      src: null,
      crop: {
        unit: '%',
        width: 30,
        aspect: 1/1
      },
      croppedImageUrl: null,
      croppedImage: null,
    }
  }

  handleFile = (e) => {
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({src:fileReader.result})
    }
    fileReader.readAsDataURL(e.target.files[0]);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // const user = this.props.currentUser
    const formData = new FormData();

    // formData.append('user[id]', user.id);
    formData.append('file', this.state.croppedImage);

    // console.log(formData);
    // this.addPhotoTouser(/*user,*/ formData);
    axios.post('http://localhost:3027/profile-picture', formData, {})
      .then(response => {
        console.log(response);
        if(response.status === 200){
          this.setState({currentAction:null})
        }
      })
  }

  onImageLoaded = (image) => {
    this.imageRef = image;
    // console.log(image);
  }

  onCropChange = (crop) => {
    this.setState({crop});
    // console.log(crop);
  }

  onCropComplete = (crop) => {
    if(this.imageRef && crop.width && crop.height){
      const croppedImageUrl = this.getCroppedImg(this.imageRef, crop);
      this.setState({croppedImageUrl});
    }
  }

  getCroppedImg(image, crop) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight /image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    )

    const reader = new FileReader();
    const id = this.props.user.id;
    canvas.toBlob(blob => {
      reader.readAsDataURL(blob)
      reader.onloadend = () => {
        this.dataUrlToFile(reader.result, `${id}_avatar.jpg`);
      }
    })
  }

  dataUrlToFile = (dataUrl, fileName) => {
    let arr = dataUrl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    while(n--){
      u8arr[n] = bstr.charCodeAt(n);
    }
    let croppedImage = new File([u8arr], fileName, {type:mime});
    this.setState({croppedImage:croppedImage});
    console.log(croppedImage);
  }

  addPhotoTouser = (/*user,*/ formData) => {
    console.log(formData);
    console.log(this.state);
  }

  onActionUpdate = (action) => {
    this.setState({currentAction:action});
  }

  render(){
    const {crop, src} = this.state;
    // eslint-disable-next-line
    const { about, dob, email, id, origin, profile_picture, tcbatch, username} = this.props.user;
    return (
      <>
        {this.state.currentAction === 'selecting-image'?
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <div className="container">
              <button> Cancel</button>
              <button> Save </button>
            </div>
            <input
              type="file"
              onChange={this.handleFile}
            />
            {src && (
              <ReactCrop
                src={src}
                crop={crop}
                onImageLoaded={this.onImageLoaded}
                onComplete={this.onCropComplete}
                onChange={this.onCropChange}
              />
            )}
          </form>
        </div>
        :
        <div className="container-fluid" id="cover">
          <div className="row justify-content-center" id="cover-inner">

            <div className="col-4">
              <img className="profile-picture" src={`http://localhost:3027/picture/${profile_picture}`} alt={profile_picture} />

              <span
                id="profile-picture-button"
                onClick={()=>this.onActionUpdate('selecting-image')}
              >
                <FontAwesomeIcon icon={faCameraRetro} />
              </span>
            </div>

            <div className="col-5">
              {about}
            </div>

          </div>
        </div>
        }
      </>
    )
  }
}

export default Profile;
