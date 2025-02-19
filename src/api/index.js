import axios from "axios";
import * as ImageManipulator from "expo-image-manipulator";

export default class Api {
  // upload Files
  static uploadFile = async (url, file, fileMeta, setLoading) => {
    try {
      if (setLoading) setLoading(true);

      const filename = file?.name ? file?.name : file.uri.split("/").pop();
      const ext = filename.split(".").pop();

      const { width, height, uri } = file;

      const result = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: width / 2.5, height: height / 2.5 } }],
        { compress: 0.15, format: ImageManipulator.SaveFormat.JPEG }
      );

      const newFile = {
        uri: result.uri,
        name: filename.trim(),
        type: `image/${ext}`,
      };

      const formData = new FormData();
      formData.append(fileMeta.formname, newFile);

      fileMeta.otherFields.forEach((field) => {
        formData.append(field.name, field.value);
      });

      const res = await axios.post(`${url}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res?.data;
    } catch (error) {
      return { error: error?.response?.data?.message || error.message };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static updateFile = async (url, file, fileMeta, setLoading) => {
    try {
      if (setLoading) setLoading(true);

      const filename = file?.name ? file?.name : file.uri.split("/").pop();
      const ext = filename.split(".").pop();

      const { width, height, uri } = file;

      const result = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: width / 2.5, height: height / 2.5 } }],
        { compress: 0.15, format: ImageManipulator.SaveFormat.JPEG }
      );

      const newFile = {
        uri: result.uri,
        name: filename.trim(),
        type: `image/${ext}`,
      };

      const formData = new FormData();
      formData.append(fileMeta.formname, newFile);

      fileMeta.otherFields.forEach((field) => {
        formData.append(field.name, field.value);
      });

      const res = await axios.patch(`${url}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res?.data;
    } catch (error) {
      return { error: error?.response?.data?.message || error.message };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static uploadFiles = async (files, setLoading) => {
    try {
      if (setLoading) setLoading(true);

      const formData = new FormData();

      files.forEach((file, index) => {
        const filename = file?.name ? file?.name : file.uri.split("/").pop();
        const ext = filename.split(".").pop();

        const newFile = {
          uri: file.uri,
          name: filename.trim(),
          type: `image/${ext}`,
        };

        formData.append(`images`, newFile);
      });

      const res = await axios.post(`upload-images`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res?.data;
    } catch (error) {
      return { error: error?.response?.data?.message || error.message };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static updateFiles = async (files, setLoading) => {
    try {
      if (setLoading) setLoading(true);

      let imgs = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (file?._id) imgs.push(file);
        else {
          console.log("Here");

          const res = await this.uploadFile(file);

          if (res?.error) throw new Error(res?.error);

          imgs.push({
            name: res?.fileName,
            url: res?.imageUrl,
          });
        }
      }

      return imgs;
    } catch (error) {
      return { error: error?.response?.data?.message || error.message };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static login = async (data, setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.post(`auth/login`, data);
      return res?.data;
    } catch (error) {
      return {
        error: error?.response?.data?.message || error.message,
        status: error?.response?.status,
      };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static register = async (data, setLoading) => {
    try {
      if (setLoading) setLoading(true);

      const res = await axios.post(`user/register`, data);
      return res?.data;
    } catch (error) {
      return { error: error?.response?.data?.message || error.message };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static completeProfile = async (data, setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.patch(`auth/complete-profile`, data);
      return res?.data;
    } catch (error) {
      return {
        error: error?.response?.data?.message || error.message,
        status: error?.response?.status,
      };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static forgetPassword = async (data, setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.post(`auth/forgot-password`, data);
      return res?.data;
    } catch (error) {
      console.log(error);
      return { error: error?.response?.data?.message || error.message };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static resetPassword = async (data, setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.post(`auth/reset-password`, data);
      return res?.data;
    } catch (error) {
      console.log(error);
      return { error: error?.response?.data?.message || error.message };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static getProfile = async (query, setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.get(`user/${query}`);
      return res?.data;
    } catch (error) {
      console.log(error);
      return { error: error?.response?.data?.message || error.message };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static updateProfile = async (id, data, setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.patch(`user/${id}`, data);
      return res?.data;
    } catch (error) {
      console.log(error);
      return {
        error: error?.response?.data?.message || error.message,
        status: error?.response?.status,
      };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static addPhoneNumber = async (user_id, data, setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.patch(
        `user/update-phone-no-and-send-otp/${user_id}`,
        data
      );
      return res?.data;
    } catch (error) {
      console.log(error);
      return {
        error: error?.response?.data?.message || error.message,
        status: error?.response?.status,
      };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static verifyPhoneNumber = async (user_id, data, setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.post(`user/verify-otp/${user_id}`, data);
      return res?.data;
    } catch (error) {
      console.log(error);
      return {
        error: error?.response?.data?.message || error.message,
        status: error?.response?.status,
      };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static sentOtp = async (user_id, body, setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.post(`user/send-otp/${user_id}`, body);
      return res?.data;
    } catch (error) {
      console.log(error);
      return {
        error: error?.response?.data?.message || error.message,
        status: error?.response?.status,
      };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static getInvestmentOpportunities = async (query = "", setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.get(`investment-opportunities${query}`);
      return res?.data;
    } catch (error) {
      console.log(error);
      return { error: error?.response?.data?.message || error.message };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static getPortfolio = async (query = "", setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.get(`portfolios${query}`);
      return res?.data;
    } catch (error) {
      console.log(error);
      return { error: error?.response?.data?.message || error.message };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static createPortfolio = async (data, setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.post(`portfolios`, data);
      return res?.data;
    } catch (error) {
      console.log(error);
      return { error: error?.response?.data?.message || error.message };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static getUserPortfolios = async (query = "", setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.get(`portfolios/user${query}`);
      return res?.data;
    } catch (error) {
      console.log(error);
      return { error: error?.response?.data?.message || error.message };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static createInvestment = async (data, setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.post(`investments`, data);
      return res?.data;
    } catch (error) {
      console.log(error);
      return { error: error?.response?.data?.message || error.message };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static getPortfolioInvestments = async (query = "", setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.get(`portfolios/${query}/investments`);
      return res?.data;
    } catch (error) {
      console.log(error);
      return { error: error?.response?.data?.message || error.message };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static getPortfolioInvestmentsDetails = async (query = "", setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.get(`portfolios/${query}/investments-maturity`);
      return res?.data;
    } catch (error) {
      console.log(error);
      return { error: error?.response?.data?.message || error.message };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static getPortfolioDetailedOverView = async (query = "", setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.get(`portfolios/${query}/detailed-overview`);
      return res?.data;
    } catch (error) {
      console.log(error);
      return { error: error?.response?.data?.message || error.message };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static getPortfolioStats = async (query = "", setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.get(`portfolios/${query}/detailed-stats`);
      return res?.data;
    } catch (error) {
      console.log(error);
      return { error: error?.response?.data?.message || error.message };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static getPortfolioPositions = async (query = "", setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.get(`portfolios/${query}/detailed-position`);
      return res?.data;
    } catch (error) {
      console.log(error);
      return { error: error?.response?.data?.message || error.message };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static getPortfolioBreakDown = async (query = "", setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.get(`portfolios/${query}/detailed-breakdown`);
      return res?.data;
    } catch (error) {
      console.log(error);
      return { error: error?.response?.data?.message || error.message };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static getInterestingVideos = async (query = "", setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.get(`learn-videos${query}`);
      return res?.data;
    } catch (error) {
      console.log(error);
      return { error: error?.response?.data?.message || error.message };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static sellonMarket = async (uid, data, setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.post(`marketplace-listing/user/${uid}`, data);
      return res?.data;
    } catch (error) {
      console.log(error);
      return { error: error?.response?.data?.message || error.message };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static getWishlistIds = async (query = "", setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.get(
        `marketplace-listing/bookmarked-ids/user/${query}`
      );
      return res?.data;
    } catch (error) {
      console.log(error);
      return { error: error?.response?.data?.message || error.message };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static removeFromMarket = async (id, setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.patch(`marketplace-listing/cancel/${id}`);
      return res?.data;
    } catch (error) {
      console.log(error);
      return { error: error?.response?.data?.message || error.message };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static getMarketPlaceListings = async (query = "", setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.get(`marketplace-listing${query}`);
      return res?.data;
    } catch (error) {
      console.log(error);
      return { error: error?.response?.data?.message || error.message };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static getOtherUserPortfolios = async (query = "", setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.get(`marketplace-listing/user/${query}`);
      return res?.data;
    } catch (error) {
      console.log(error);
      return { error: error?.response?.data?.message || error.message };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static AddBookmark = async (data, setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.post(`marketplace-listing/add-bookmark`, data);
      return res?.data;
    } catch (error) {
      console.log(error);
      return { error: error?.response?.data?.message || error.message };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static RemoveBookmark = async (data, setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.delete(
        `marketplace-listing/remove-bookmark`,
        data
      );
      return res?.data;
    } catch (error) {
      console.log(error);
      return { error: error?.response?.data?.message || error.message };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static getBookmarkedListings = async (query = "", setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.get(
        `marketplace-listing/bookmarked/user/${query}`
      );
      return res?.data;
    } catch (error) {
      console.log(error);
      return { error: error?.response?.data?.message || error.message };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static getPurchasedListings = async (query = "", setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.get(
        `marketplace-listing/purchased/user/${query}`
      );
      return res?.data;
    } catch (error) {
      console.log(error);
      return { error: error?.response?.data?.message || error.message };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static getSoldListings = async (query = "", setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.get(`marketplace-listing/sold/user/${query}`);
      return res?.data;
    } catch (error) {
      console.log(error);
      return { error: error?.response?.data?.message || error.message };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static profilePortfolio = async (query = "", setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.get(`portfolios/profile/user/${query}`);
      return res?.data;
    } catch (error) {
      console.log(error);
      return { error: error?.response?.data?.message || error.message };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static buyPortfolio = async (data, setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.post(`marketplace-listing/buy-portfolio`, data);
      return res?.data;
    } catch (error) {
      console.log(error);
      return { error: error?.response?.data?.message || error.message };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static getNotifications = async (query = "", setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.get(`notification/list/${query}`);
      return res?.data;
    } catch (error) {
      console.log(error);
      return { error: error?.response?.data?.message || error.message };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static registerToken = async (userId, data, setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.post(
        `notification/register-push-token/${userId}`,
        data
      );
      return res?.data;
    } catch (error) {
      console.log(error);
      return { error: error?.response?.data?.message || error.message };
    } finally {
      if (setLoading) setLoading(false);
    }
  };
}
