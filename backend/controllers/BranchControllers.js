import Branch  from"../models/chinhanh.js";

// Phương thức để tạo các chi nhánh mặc định
export const createDefaultBranches = async (req, res) => {
  console.log("Gọi phương thức tạo chi nhánh mặc định");
    const branches = [
      { branchname: 'CN Tân Bình', branchlocation: '32 Trường Sơn, Phường 2, Quận Tân Bình, Thành phố Hồ Chí Minh, Việt Nam.' },
      { branchname: 'CN Hóc Môn', branchlocation: '806 QL22, ấp Mỹ Hòa 3, Quận Hóc Môn, Thành phố Hồ Chí Minh, Việt Nam.' },
      { branchname: 'CN Sư Vạn Hạnh', branchlocation: '828 Sư Vạn Hạnh, Phường 13, Quận 10, Thành phố Hồ Chí Minh, Việt Nam.' },
    ];
  
    try {
      for (const branch of branches) {
        const existingBranch = await Branch.findOne({ branchname: branch.branchname }); // Sửa lại tên trường
        if (!existingBranch) {
          await Branch.create(branch);
          console.log(`Đã tạo chi nhánh: ${branch.branchname}`); // Sửa lại tên trường
        } else {
          console.log(`Chi nhánh ${branch.branchname} đã tồn tại.`);
        }
      }
      res.status(201).json({ message: 'Các chi nhánh mặc định đã được tạo hoặc đã tồn tại.' });
    } catch (error) {
      console.error('Lỗi khi tạo chi nhánh:', error);
      res.status(500).json({ message: 'Lỗi khi tạo chi nhánh.', error });
    }
  };
  
export const addBranch = async (req, res) => {
    const { branchname, branchlocation } = req.body;
    console.log('Received data:', req.body);
    // Kiểm tra nếu tên chi nhánh hoặc địa điểm để trống
    if (!branchname || !branchlocation) {
      return res.status(400).json({ message: 'Tên chi nhánh và địa điểm không được để trống.' });
    }
  
    try {
      // Kiểm tra xem chi nhánh đã tồn tại chưa
      const existingBranch = await Branch.findOne({ branchname });
      if (existingBranch) {
        return res.status(400).json({ message: 'Chi nhánh đã tồn tại.' });
      }
  
      // Tạo chi nhánh mới
      const newBranch = await Branch.create({ branchname, branchlocation });
      res.status(201).json({ message: 'Chi nhánh đã được thêm thành công.', branch: newBranch });
    } catch (error) {
      console.error('Lỗi khi thêm chi nhánh:', error);
      res.status(500).json({ message: 'Lỗi khi thêm chi nhánh.', error });
    }
  };

// Xuất các phương thức của controller
// module.exports = {
//   createDefaultBranches,
//   // Các phương thức khác cho Branch có thể được thêm vào đây
// };
