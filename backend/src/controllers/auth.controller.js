
class AuthController {
    constructor( authService) {
        this.authService = authService;
    }

    login = async (req, res) => {
        const { email, password } = req.body;

        try {
           const token = await this.authService.login(email, password);
           res.json({ token });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
module.exports = AuthController;