import React, {Component} from 'react';
import '../../fonts/BRUSHSCI.TTF';
import './Profile.css';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faCameraRetro,
  faUser,
  faHashtag,
  faCalendar,
  faMapMarked,
  faPencilAlt,
  faCheck,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import TextInputGroup from '../subComponents/TextInputGroup/TextInputGroup';
import BackButton from '../subComponents/BackButton/BackButton';
import axios from 'axios';
import moment from 'moment';

class Profile extends Component{
  constructor(props){
    super(props);
    this.state = {
      currentAction: null,
      src: null,
      crop: {
        unit: '%',
        width: 30,
        aspect: 1/1
      },
      croppedImageUrl: null,
      croppedImage: null,
      isEditingAbout: false,
      id: this.props.user.id,
      about: this.props.user.about,
      username: this.props.user.username,
      completename: this.props.user.completename,
      email: this.props.user.email,
      tcbatch: this.props.user.tcbatch,
      origin: this.props.user.origin,
      dob: this.props.user.dob,
      profile_picture: this.props.user.profile_picture,
    }
  }

  editingAbout = (bool) => {
    this.setState({isEditingAbout:bool});
  }

  onActionCanceled = () => {
    this.onActionUpdate(null);
    this.resetProfile();
  }

  onActionUpdate = (action) => {
    this.setState({currentAction:action});
  }

  resetProfile = () => {
    this.setState({
      about: this.props.user.about,
      username: this.props.user.username,
      completename: this.props.user.completename,
      email: this.props.user.email,
      tcbatch: this.props.user.tcbatch,
      origin: this.props.user.origin,
      dob: this.props.user.dob,
      profile_picture: this.props.user.profile_picture,
    });
  }

  onNameChange = (e) => {
    this.setState({username:e.target.value})
  }

  onCompleteNameChange = (e) => {
    this.setState({completename:e.target.value})
  }

  onBatchChange = (e) => {
    this.setState({tcbatch:e.target.value})
  }

  onOriginChange = (e) => {
    this.setState({origin:e.target.value})
  }

  onDobChange = (e) => {
    this.setState({dob:e.target.value})
  }

  updateProfile = (e) => {
    e.preventDefault();
    const {id, username, completename, tcbatch, origin, dob} = this.state;
    fetch('http://localhost:3027/profile-detail', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: id,
        username:username,
        tcbatch:tcbatch,
        origin:origin,
        dob :dob,
        completename: completename,
      })
    }).then(response => response.json())
      .then(response => {
        this.onActionUpdate(null);
        this.props.loadUser();
      })
  }

  onAboutChange = (e) => {
    this.setState({about:e.target.value})
  }

  onAboutUpdate = (e) => {
    e.preventDefault();
    const id = this.state.id;
    const about = this.state.about;
    fetch('http://localhost:3027/about', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: this.state.id,
        about: this.state.about,
      })
    }).then(response=> response.json())
      .then(response => {
        this.props.loadUser();
        this.setState({isEditingAbout:false});
      })
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

    // this.addPhotoTouser(/*user,*/ formData);
    if(!this.state.croppedImage){
      console.log('nothing to send');
    } else {
      axios.post('http://localhost:3027/profile-picture', formData, {})
      .then(response => {
        if(response.status === 200){
          this.setState({currentAction:null});
          setTimeout(()=>this.props.loadUser(), 200);
        }
      })
    }
  }

  onImageLoaded = (image) => {
    this.imageRef = image;
  }

  onCropChange = (crop) => {
    this.setState({crop});
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
  }

  addPhotoTouser = (/*user,*/ formData) => {
    console.log(formData);
  }

  render(){
    const {crop, src} = this.state;
    // eslint-disable-next-line
    const { about, dob, email, id, origin, profile_picture, tcbatch, username, completename} = this.state;
    return (
      <>
        {
          !this.state.currentAction?
            // profile
            <>
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
                  {
                    this.state.isEditingAbout?
                    <div className="col-5" id="about-form">
                      <div className="row justify-content-center">
                        <div className="col">
                          <form onSubmit={this.onAboutUpdate}>
                              <textarea
                                id="about-input-field"
                                defaultValue={about}
                                onChange={this.onAboutChange}
                                className="form-control"></textarea>
                              <div className="container-fluid">
                                <div className="row">
                                  <div
                                    id="about-back-button"
                                    onClick={()=>this.editingAbout(false)}
                                    className="col text-center bg-warning">
                                    <FontAwesomeIcon icon={faTimes} />
                                  </div>

                                  <div id="about-submit" className="col text-center bg-success">
                                    <button type="submit">
                                      <FontAwesomeIcon icon={faCheck} />
                                    </button>
                                  </div>
                                </div>
                              </div>
                          </form>
                        </div>
                      </div>
                    </div>

                  :

                    <div className="col-5" id="about">
                      <div className="row justify-content-center">
                        <div className="col-8">
                          <p>"{about}"</p>
                          <span
                            onClick={()=>this.editingAbout(true)}
                            id="edit-about-button"
                            className="float-right">
                            <FontAwesomeIcon icon={faPencilAlt} />
                          </span>
                        </div>
                      </div>
                    </div>
                  }
                </div>
              </div>
              <div className="container">
                <ul className="list-group">
                  <li className="list-group-item">{username}</li>
                  <li className="list-group-item">{completename}</li>
                  <li className="list-group-item">{tcbatch}</li>
                  <li className="list-group-item">{moment(dob).format('MMM Do YYYY')}</li>
                  <li className="list-group-item">{email}</li>
                  <li className="list-group-item">{origin}</li>
                </ul>
                <div className="d-flex justify-content-center">
                  <span
                    id="update-info-button"
                    className="mt-2 px-3"
                    onClick={() => this.onActionUpdate('updating-profile')}
                  >
                    <FontAwesomeIcon icon={faPencilAlt} /> Edit info
                  </span>
                </div>
              </div>


            </>
          :(
            this.state.currentAction === 'selecting-image'?
              // react crop
              <>
                <BackButton
                  action={this.onActionCanceled}
                />
                <div className="container">
                  <form onSubmit={this.handleSubmit}>
                    <div className="container">
                      <input
                        type="submit"
                        className="btn btn-primary"
                        onClick={this.handleSubmit}
                        value="Save"
                      />
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
              </>
            :
              // update form
              <>
                <BackButton
                  action={this.onActionCanceled}
                />
                <div className="container">
                  <h5>Update your info</h5>
                  <form onSubmit={this.updateProfile}>
                    <TextInputGroup
                      label="Username"
                      type="text"
                      onChangeAction={this.onNameChange}
                      id="username"
                      icon={faUser}
                      val={username}
                    />
                    <TextInputGroup
                      label="Complete Name"
                      type="text"
                      onChangeAction={this.onCompleteNameChange}
                      id="completeName"
                      icon={faUser}
                      val={completename}
                    />
                    <TextInputGroup
                      label="Batch"
                      type="text"
                      onChangeAction={this.onBatchChange}
                      id="batch"
                      icon={faHashtag}
                      val={tcbatch}
                    />
                    <TextInputGroup
                      label="Birhtday"
                      type="date"
                      onChangeAction={this.onDobChange}
                      id="dob"
                      icon={faCalendar}
                      val={moment(dob).format('YYYY-MM-DD')}
                    />
                    <TextInputGroup
                      label="Origin"
                      type="text"
                      onChangeAction={this.onOriginChange}
                      id="origin"
                      icon={faMapMarked}
                      val={origin}
                    />
                    <input type="submit"
                      className="btn btn-success"
                      value="Update"
                    />
                  </form>
                </div>
              </>
          )
        }
      </>
    )
  }
}

export default Profile;
