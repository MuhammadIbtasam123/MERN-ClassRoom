// export const createInviteLink = async (req, res) => {

//     try {
//         const { classId } = req.params;
//         const classToInvite = await Class.findById(classId);

//         if (!classToInvite) {
//         return res.status(404).json({ message: "Class not found" });
//         }

//         if (classToInvite.teacherID.toString() !== req.user._id.toString()) {
//         return res.status(401).json({ message: "Unauthorized" });
//         }

//         if (classToInvite.inviteLink) {
//         return res.status(200).json({ inviteLink: classToInvite.inviteLink });
//         }

//         const inviteLink = `${req.protocol}://${req.get("host")}/join/${classId}`;
//         classToInvite.inviteLink = inviteLink;
//         await classToInvite.save();

//         res.status(200).json({ inviteLink });
//     } catch (error) {
//         console.error("Error creating invite link:", error);
//         res.status(500).json({ message: "Something went wrong" });
//     }
// };
