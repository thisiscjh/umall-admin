<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show" @closed="clear">
      <el-form :model="form">
        <el-form-item label="标题" label-width="80px">
          <el-input v-model="form.title"></el-input>
        </el-form-item>

        <el-form-item label="图片" label-width="80px">
          <el-upload class="avatar-uploader" action="#" :show-file-list="false" :on-change="change">
            <img :src="imgUrl" v-if="imgUrl" class="avatar" />
            <i class="el-icon-plus avatar-uploader-icon" v-else></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  requestBannerAdd,
  requestBannerDetail,
  requestBannerUpdate,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  components: {},
  data() {
    // 发给后台的数据
    return {
      imgUrl: "",
      form: {
        title: "",
        img: null,
        status: 1,
      },
    };
  },
  methods: {
    ...mapActions({
      requestList: "banner/requestList",
    }),
    // 图片发生改变
    change(file) {
      this.imgUrl = URL.createObjectURL(file.raw);
      this.form.img = file.raw;
    },
    // 取消
    cancel() {
      this.info.show = false;
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    //置空
    empty() {
      this.form = {
        title: "",
        img: null,
        status: 1,
      };
      this.imgUrl = "";
    },
    //点击的是修改时弹框动画结束清除所有值
    clear() {
      
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    // 添加
    add() {
      if (this.form.title == "" || this.form.img == null) {
        warningAlert("不能空值，请输入");
        return;
      }
      requestBannerAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
           //清空
           this.empty();
           //弹框消失
          this.cancel();
          // 重新获取
          this.requestBannerList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //获取一条数据
    getDetail(id) {
      requestBannerDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.imgUrl = this.$imgPre + this.form.img;
      });
    },
    // 点击编辑
    update() {
      if (this.form.title == "" || this.form.img == null) {
        warningAlert("不能空值，请输入");
        return;
      }
      requestBannerUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert("修改成功");
          this.cancel();
          this.empty();
          this.requestList
          this.requestList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {},
};
</script>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #333;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #d9d9d9;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #d9d9d9;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>