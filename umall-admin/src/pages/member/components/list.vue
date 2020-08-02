<template>
  <div>
    <el-dialog title="会员修改" :visible.sync="info.show" @closed="clear">
      <el-form :model="form">
        <el-form-item label="手机号" label-width="80px">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="昵称" label-width="80px">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="80px">
          <el-input v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
         <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { requestMemberDetail, requestMemberUpdate } from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      //提交给后端的数据
      form: {
        phone: "",
        nickname: "",
        password: "",
        status: 1,
      },
    };
  },
  methods: {
    ...mapActions({
      requestList: "member/requestList",
    }),
    //置空数据
    empty() {
      this.form = {
        phone: "",
        nickname: "",
        password: "",
        status: 1,
      };
    },
    //取消
    cancel() {
      this.info.show = false;
      if (!this.info.isAdd) {
        this.empty();
      }
    },
     //获取某一条的数据
    getDetail(id) {
      requestMemberDetail({ uid: id }).then((res) => {
        this.form = res.data.list;
      });
    },
    //点击编辑
    update() {
      if (
        this.form.phone == "" ||
        this.form.nickname == "" ||
        this.form.password == ""
      ) {
        warningAlert("不能空值,请输入");
        return;
      }
      requestMemberUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert("修改成功");
          this.empty();
          this.info.show = false;
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
</style>